import { useMemo, useState, useEffect, useRef } from "react";
import useFirebase from "./useFirebase";

import isClientSide from "../utils/isClientSide";

const useFirestoreQuery = (query) => {
  const [docs, setDocs] = useState([]);

  // Store current query in ref
  const queryRef = useRef(query);

  // Compare current query with the previous one
  useEffect(() => {
    // Use Firestore built-in 'isEqual' method
    // to compare queries
    if (!queryRef?.curent?.isEqual(query)) {
      queryRef.current = query;
    }
  }, [query, queryRef]);

  // Re-run data listener only if query has changed
  useEffect(() => {
    if (!queryRef.current) {
      return null;
    }

    // Subscribe to query with onSnapshot
    const unsubscribe = queryRef.current.onSnapshot((querySnapshot) => {
      // Get all documents from collection - with IDs
      const data = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      // Update state
      setDocs(data);
    });

    // Detach listener
    return unsubscribe;
  }, [queryRef]);

  return docs;
};

const useDatabase = ({ ref, limit = 100 }) => {
  const firebase = useFirebase();
  const database = firebase.firestore();
  const collectionByRef = useMemo(() => {
    if (ref && isClientSide()) {
      return database.collection(ref);
    }
    return undefined;
  }, [ref, database]);

  const data = useFirestoreQuery(
    collectionByRef.orderBy("createdAt", "asc").limit(limit)
  );

  return {
    data,
    collectionByRef,
    firebase,
  };
};

export default useDatabase;

import { collection, doc, setDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firestore';
import localProperties from '../data/dummyProperties.json';

/**
 * Checks if the Firestore database has properties.
 * If empty, it automatically uploads the local JSON data to Firestore.
 */
export const seedPropertiesIfEmpty = async () => {
  try {
    const snap = await getDocs(collection(db, 'properties'));
    
    if (snap.empty) {
      console.log('Database is empty. Uploading 116 properties to Firestore...');
      
      // We process them in chunks so we don't overwhelm the network/browser
      const batchSize = 20;
      for (let i = 0; i < localProperties.length; i += batchSize) {
        const chunk = localProperties.slice(i, i + batchSize);
        const promises = chunk.map(property => {
          const docRef = doc(db, 'properties', property.id.toString());
          return setDoc(docRef, property);
        });
        
        await Promise.all(promises);
        console.log(`Uploaded ${i + chunk.length} / ${localProperties.length}`);
      }
      
      console.log('✅ Firebase database seeding complete!');
      return true;
    } else {
      console.log(`Firebase ready: Found ${snap.size} properties in the database.`);
      return false; // Already seeded
    }
  } catch (error) {
    console.error('Error connecting to Firebase or seeding database:', error);
    throw error;
  }
};

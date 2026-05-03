import { defineMigration, set } from 'sanity/migrate';

export default defineMigration({
  title: 'Rename gallery type to imageGallery',
  documentTypes: ['blogPosts'],

  migrate: {
    object(node) {
      if (node._type === 'gallery') {
        return set({ ...node, _type: 'imageGallery' });
      }
    },
  },
});

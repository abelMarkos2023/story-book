// 'use client';

// import { useEditor, EditorContent } from '@tiptap/react';
// import StarterKit from '@tiptap/starter-kit';
// import Image from '@tiptap/extension-image';
// import Link from '@tiptap/extension-link';
// import { useState } from 'react';

// export default function ChapterEditor() {
//   const [content, setContent] = useState('');

//   const editor = useEditor({
//     extensions: [
//       StarterKit,
//       Image,
//       Link.configure({
//         openOnClick: false,
//       }),
//     ],
//     content: '',
//     onUpdate: ({ editor }) => {
//       setContent(editor.getJSON());
//     },
//   });

//   const addImage = () => {
//     const url = window.prompt('Enter image URL');
//     if (url) {
//       editor.chain().focus().setImage({ src: url }).run();
//     }
//   };

//   const addLink = () => {
//     const url = window.prompt('Enter link URL');
//     if (url && editor) {
//       editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
//     }
//   };

//   return (
//     <div style={{ maxWidth: '800px', margin: '0 auto' }}>
//       <div className="toolbar" style={{ marginBottom: '10px' }}>
//         <button onClick={() => editor.chain().focus().toggleBold().run()}>Bold</button>
//         <button onClick={() => editor.chain().focus().toggleItalic().run()}>Italic</button>
//         <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>H2</button>
//         <button onClick={addImage}>Add Image</button>
//         <button onClick={addLink}>Add Link</button>
//       </div>

//       <EditorContent editor={editor} style={{ border: '1px solid #ccc', padding: '10px', minHeight: '200px' }} />

//       <h3>📝 JSON Output (to store in DB)</h3>
//       <pre style={{ background: '#f7f7f7', padding: '10px', borderRadius: '5px' }}>
//         {JSON.stringify(content, null, 2)}
//       </pre>
//     </div>
//   );
// }

'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import { Button } from '@/components/ui/button';

export default function ChapterEditor({ content, onChange }: { content?: string, onChange: (value: string) => void }) {
  const editor = useEditor({
    extensions: [StarterKit, Image],
    content: content || '',
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('/api/chapter/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    if (data.secure_url) {
      editor.chain().focus().setImage({ src: data.secure_url }).run();
    }
  };

  return (
    <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
      <div className="flex gap-2 mb-2">
        <Button size="sm" onClick={() => editor.chain().focus().toggleBold().run()} className="bg-yellow-500">Bold</Button>
        <Button size="sm" onClick={() => editor.chain().focus().toggleItalic().run()} className="bg-yellow-500">Italic</Button>
        <Button size="sm" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className="bg-yellow-500">H2</Button>
        
        <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-white text-sm flex items-center">
          📷 Add Image
          <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
        </label>
      </div>

      <EditorContent editor={editor} className="bg-gray-800 p-3 min-h-[300px] rounded" />
    </div>
  );
}

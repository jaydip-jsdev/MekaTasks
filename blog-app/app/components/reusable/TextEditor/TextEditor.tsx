"use client";

import Underline from "@tiptap/extension-underline";
import { Editor, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useState, useRef } from "react";
import {
  FaBold,
  FaHeading,
  FaItalic,
  FaListOl,
  FaListUl,
  FaUnderline,
} from "react-icons/fa";

const Tiptap = ({ content, setContent }: any) => {
  const [headingLevel, setHeadingLevel] = useState(1);
  const isInitialMount = useRef(true);

  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: content,
    editorProps: {
      attributes: {
        class: "editor border-none outline-none",
      },
    },

    onUpdate({ editor }) {
      setContent(editor.getHTML());
    },

    immediatelyRender: false,
  });

  useEffect(() => {
    if (editor && content && isInitialMount.current) {
      editor.commands.setContent(content);
      isInitialMount.current = false;
    }
  }, [editor, content]);

  if (!editor) return null;

  return (
    <>
      <div className="">
        <div className="flex items-center gap-4 my-2">
          <div className="relative">
            <button>
              <FaHeading />
            </button>
            <select
              value={headingLevel}
              onChange={(e) => {
                const level = Number(e.target.value) as 1 | 2 | 3 | 4 | 5 | 6;
                setHeadingLevel(level);
                editor.chain().focus().toggleHeading({ level }).run();
              }}
              className="absolute top-0 w-fit left-0 opacity-0"
            >
              {[1, 2, 3, 4, 5, 6].map((level) => {
                return (
                  <option key={level} value={level}>
                    H{level}
                  </option>
                );
              })}
            </select>
          </div>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`mb-1 ml-4`}
          >
            <FaBold />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`mb-1 ml-4`}
          >
            <FaItalic />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`mb-1 ml-4`}
          >
            <FaUnderline />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`mb-1 ml-4`}
          >
            <FaListUl />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`mb-1 ml-4`}
          >
            <FaListOl />
          </button>
        </div>
        <div className="border border-black ">
          <EditorContent editor={editor} className="tiptap" />
        </div>
      </div>
    </>
  );
};

export default Tiptap;

'use client';

import { OrganizationSwitcher, UserButton } from '@clerk/nextjs';
import {
  BoldIcon,
  FileIcon,
  FileJsonIcon,
  FilePenIcon,
  FilePlusIcon,
  FileTextIcon,
  GlobeIcon,
  ItalicIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  StrikethroughIcon,
  TextIcon,
  Trash2Icon,
  UnderlineIcon,
  Undo2Icon,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { BsFilePdf } from 'react-icons/bs';

import type { Doc } from '@/../convex/_generated/dataModel';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from '@/components/ui/menubar';
import { useEditorStore } from '@/store/use-editor-store';

import { Avatars } from './avatars';
import { DocumentInput } from './document-input';
import { Inbox } from './inbox';

interface NavbarProps {
  data: Doc<'documents'>;
}

export const Navbar = ({ data }: NavbarProps) => {
  const { editor } = useEditorStore();

  interface InsertTableProps {
    rows: number;
    cols: number;
  }

  const insertTable = ({ rows, cols }: InsertTableProps) => {
    editor?.commands.insertTable({ rows, cols, withHeaderRow: false });
  };

  const onDownload = (blob: Blob, fileName: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');

    a.href = url;
    a.download = fileName;

    a.click();
  };

  const onSaveJSON = () => {
    if (!editor) return;

    const content = editor.getJSON();
    const blob = new Blob([JSON.stringify(content)], {
      type: 'application/json',
    });

    onDownload(blob, `${data.title}.json`);
  };

  const onSaveHTML = () => {
    if (!editor) return;

    const content = editor.getHTML();
    const blob = new Blob([content], {
      type: 'text/html',
    });

    onDownload(blob, `${data.title}.html`);
  };

  const onSaveText = () => {
    if (!editor) return;

    const content = editor.getText();
    const blob = new Blob([content], {
      type: 'text/plain',
    });

    onDownload(blob, `${data.title}.txt`);
  };

  return (
    <nav className="flex items-center justify-between">
      <div className="flex gap-2 items-center">
        <Link href="/">
          <Image src="/logo.svg" alt="Docs Logo" width={36} height={36} />
        </Link>

        <div className="flex flex-col">
          <DocumentInput title={data.title} id={data._id} />

          <div className="flex">
            <Menubar className="border-none bg-transparent shadow-none h-auto p-0">
              <MenubarMenu>
                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">File</MenubarTrigger>

                <MenubarContent className="print:hidden">
                  <MenubarSub>
                    <MenubarSubTrigger>
                      <FileIcon className="size-4 mr-2" /> Save
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem onClick={onSaveJSON}>
                        <FileJsonIcon className="size-4 mr-2" />
                        JSON
                      </MenubarItem>
                      <MenubarItem onClick={onSaveHTML}>
                        <GlobeIcon className="size-4 mr-2" />
                        HTML
                      </MenubarItem>

                      <MenubarItem onClick={() => window.print()}>
                        <BsFilePdf className="size-4 mr-2" />
                        PDF
                      </MenubarItem>
                      <MenubarItem onClick={onSaveText}>
                        <FileTextIcon className="size-4 mr-2" />
                        Text
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>

                  <MenubarItem>
                    <FilePlusIcon className="size-4 mr-2" /> New Document
                  </MenubarItem>

                  <MenubarSeparator />

                  <MenubarItem>
                    <FilePenIcon className="size-4 mr-2" />
                    Rename
                  </MenubarItem>

                  <MenubarItem>
                    <Trash2Icon className="size-4 mr-2" />
                    Remove
                  </MenubarItem>

                  <MenubarSeparator />

                  <MenubarItem onClick={() => window.print()}>
                    <PrinterIcon className="size-4 mr-2" />
                    Print <MenubarShortcut>⌘P</MenubarShortcut>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>

              <MenubarMenu>
                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">Edit</MenubarTrigger>

                <MenubarContent>
                  <MenubarItem disabled={!editor?.can().undo()} onClick={() => editor?.commands.undo()}>
                    <Undo2Icon className="size-4 mr-2" />
                    Undo
                    <MenubarShortcut>⌘Z</MenubarShortcut>
                  </MenubarItem>

                  <MenubarItem disabled={!editor?.can().redo()} onClick={() => editor?.commands.redo()}>
                    <Redo2Icon className="size-4 mr-2" />
                    Redo
                    <MenubarShortcut>⌘Y</MenubarShortcut>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>

              <MenubarMenu>
                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">Insert</MenubarTrigger>

                <MenubarContent>
                  <MenubarSub>
                    <MenubarSubTrigger>Table</MenubarSubTrigger>

                    <MenubarSubContent>
                      {Array.from({ length: 4 }, (_, i) => i + 1).map((n) => (
                        <MenubarItem key={n} onClick={() => insertTable({ rows: n, cols: n })}>
                          {n} x {n}
                        </MenubarItem>
                      ))}
                    </MenubarSubContent>
                  </MenubarSub>
                </MenubarContent>
              </MenubarMenu>

              <MenubarMenu>
                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">Format</MenubarTrigger>

                <MenubarContent>
                  <MenubarSub>
                    <MenubarSubTrigger>
                      <TextIcon className="size-4 mr-2" />
                      Text
                    </MenubarSubTrigger>

                    <MenubarSubContent>
                      <MenubarItem disabled={!editor?.can().toggleBold()} onClick={() => editor?.commands.toggleBold()}>
                        <BoldIcon className="size-4 mr-2" />
                        Bold
                        <MenubarShortcut>⌘B</MenubarShortcut>
                      </MenubarItem>

                      <MenubarItem disabled={!editor?.can().toggleItalic()} onClick={() => editor?.commands.toggleItalic()}>
                        <ItalicIcon className="size-4 mr-2" />
                        Italic
                        <MenubarShortcut>⌘I</MenubarShortcut>
                      </MenubarItem>

                      <MenubarItem disabled={!editor?.can().toggleUnderline()} onClick={() => editor?.commands.toggleUnderline()}>
                        <UnderlineIcon className="size-4 mr-2" />
                        Underline
                        <MenubarShortcut>⌘U</MenubarShortcut>
                      </MenubarItem>

                      <MenubarItem disabled={!editor?.can().toggleStrike()} onClick={() => editor?.commands.toggleStrike()}>
                        <StrikethroughIcon className="size-4 mr-2" />
                        Strikethrough&nbsp;&nbsp;
                        <MenubarShortcut>⌘S</MenubarShortcut>
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>

                  <MenubarItem disabled={!editor?.can().unsetAllMarks()} onClick={() => editor?.commands.unsetAllMarks()}>
                    <RemoveFormattingIcon className="size-4 mr-2" />
                    Clear formatting
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 pl-6">
        <Avatars />
        <Inbox />

        <OrganizationSwitcher
          afterCreateOrganizationUrl="/"
          afterLeaveOrganizationUrl="/"
          afterSelectOrganizationUrl="/"
          afterSelectPersonalUrl="/"
        />
        <UserButton />
      </div>
    </nav>
  );
};

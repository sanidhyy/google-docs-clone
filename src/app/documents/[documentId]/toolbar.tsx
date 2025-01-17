'use client';

import Highlight from '@tiptap/extension-highlight';
import {
  BoldIcon,
  ChevronDownIcon,
  HighlighterIcon,
  ItalicIcon,
  ListTodoIcon,
  type LucideIcon,
  MessageSquarePlusIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  SpellCheckIcon,
  UnderlineIcon,
  Undo2Icon,
} from 'lucide-react';
import { type ColorResult, TwitterPicker } from 'react-color';

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { useEditorStore } from '@/store/use-editor-store';

const HighlightColorButton = () => {
  const { editor } = useEditorStore();

  const value = editor?.getAttributes('highlight').color as string;

  const onChange = (color: ColorResult) => {
    editor?.commands.setHighlight({ color: color as unknown as string });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200 px-1.5 overflow-hidden text-sm">
          <HighlighterIcon className="size-4" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="p-0">
        <TwitterPicker color={value} onChange={onChange} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const TextColorButton = () => {
  const { editor } = useEditorStore();

  const value = (editor?.getAttributes('textStyle').color as string | undefined) || '#000000';

  const onChange = (color: ColorResult) => {
    editor?.chain().focus().setColor(color.hex).run();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200 px-1.5 overflow-hidden text-sm">
          <span className="text-xs">A</span>

          <div className="h-0.5 w-full" style={{ backgroundColor: value }} />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="p-0">
        <TwitterPicker color={value} onChange={onChange} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const HeadingLevelButton = () => {
  const { editor } = useEditorStore();

  const headings = [
    { label: 'Heading 1', value: 1, fontSize: '32px' },
    { label: 'Heading 2', value: 2, fontSize: '24px' },
    { label: 'Heading 3', value: 3, fontSize: '20px' },
    { label: 'Heading 4', value: 4, fontSize: '18px' },
    { label: 'Heading 5', value: 5, fontSize: '16px' },
    { label: 'Heading 6', value: 6, fontSize: '16px' },
    { label: 'Normal text', value: 0, fontSize: '16px' },
  ] as const;

  const getCurrentHeading = () => {
    for (let level = 1; level <= headings.length; level++) {
      if (editor?.isActive('heading', { level })) {
        return `Heading ${level}`;
      }
    }

    return headings.at(-1)?.label;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200 px-1.5 overflow-hidden text-sm">
          <span className="truncate">{getCurrentHeading()}</span>

          <ChevronDownIcon className="ml-2 size-4 shrink-0" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
        {headings.map(({ label, value, fontSize }) => (
          <DropdownMenuItem key={value} asChild>
            <button
              onClick={() => {
                if (value === 0) editor?.commands.setParagraph();
                else editor?.commands.toggleHeading({ level: value });
              }}
              className={cn(
                'flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80',
                (value === 0 && !editor?.isActive('heading')) || (editor?.isActive('heading', { level: value }) && 'bg-neutral-200/80'),
              )}
              style={{ fontSize }}
            >
              {label}
            </button>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const FontFamilyButton = () => {
  const { editor } = useEditorStore();

  const fonts = [
    { label: 'Arial', value: 'Arial' },
    { label: 'Times New Roman', value: 'Times New Roman' },
    { label: 'Courier New', value: 'Courier New' },
    { label: 'Georgia', value: 'Georgia' },
    { label: 'Verdana', value: 'Verdana' },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 w-[120px] shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-200 px-1.5 overflow-hidden text-sm">
          <span className="truncate">{editor?.getAttributes('textStyle').fontFamily || 'Arial'}</span>

          <ChevronDownIcon className="ml-2 size-4 shrink-0" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
        {fonts.map(({ label, value }) => (
          <DropdownMenuItem key={value} asChild>
            <button
              onClick={() => editor?.commands.setFontFamily(value)}
              className={cn(
                'flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80',
                editor?.isActive('textStyle', { fontFamily: value }) && 'bg-neutral-200/80',
                value === 'Arial' && editor?.getAttributes('textStyle').fontFamily === undefined && 'bg-neutral-200/80',
              )}
              style={{ fontFamily: value }}
            >
              <span className="text-sm">{label}</span>
            </button>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

interface ToolbarButtonProps {
  onClick?: () => void;
  isActive?: boolean;
  disabled?: boolean;
  icon: LucideIcon;
}

const ToolbarButton = ({ onClick, isActive, disabled, icon: Icon }: ToolbarButtonProps) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
        isActive && 'bg-neutral-200/80',
      )}
    >
      <Icon className="size-4" />
    </button>
  );
};

export const Toolbar = () => {
  const { editor } = useEditorStore();

  const sections: { label: string; icon: LucideIcon; onClick: () => void; disabled?: boolean; isActive?: boolean }[][] = [
    [
      {
        label: 'Undo',
        icon: Undo2Icon,
        disabled: !editor?.can().undo(),
        onClick: () => editor?.commands.undo(),
      },
      {
        label: 'Redo',
        icon: Redo2Icon,
        disabled: !editor?.can().redo(),
        onClick: () => editor?.commands.redo(),
      },
      {
        label: 'Print',
        icon: PrinterIcon,
        onClick: () => window.print(),
      },
      {
        label: 'Spell Check',
        icon: SpellCheckIcon,
        isActive: editor?.view.dom.getAttribute('spellcheck') === 'true',
        onClick: () => {
          const current = editor?.view.dom.getAttribute('spellcheck');
          editor?.view.dom.setAttribute('spellcheck', current === 'false' ? 'true' : 'false');
        },
      },
    ],
    [
      {
        label: 'Bold',
        icon: BoldIcon,
        isActive: editor?.isActive('bold'),
        disabled: !editor?.can().toggleBold(),
        onClick: () => editor?.commands.toggleBold(),
      },
      {
        label: 'Italic',
        icon: ItalicIcon,
        isActive: editor?.isActive('italic'),
        disabled: !editor?.can().toggleItalic(),
        onClick: () => editor?.commands.toggleItalic(),
      },
      {
        label: 'Underline',
        icon: UnderlineIcon,
        isActive: editor?.isActive('underline'),
        disabled: !editor?.can().toggleUnderline(),
        onClick: () => editor?.commands.toggleUnderline(),
      },
    ],
    [
      {
        label: 'Comment',
        icon: MessageSquarePlusIcon,
        onClick: () => console.log('TODO: Comment'),
        isActive: false, // TODO: Enable this functionality
      },
      {
        label: 'List Todo',
        icon: ListTodoIcon,
        isActive: editor?.isActive('taskList'),
        disabled: !editor?.can().toggleTaskList(),
        onClick: () => editor?.commands.toggleTaskList(),
      },
      {
        label: 'Remove Formatting',
        icon: RemoveFormattingIcon,
        disabled: !editor?.can().unsetAllMarks(),
        onClick: () => editor?.commands.unsetAllMarks(),
      },
    ],
  ];

  return (
    <div className="bg-[#f1f4f9] px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto">
      {sections[0].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}

      <Separator orientation="vertical" className="h-6 bg-neutral-300" />

      <FontFamilyButton />
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      <HeadingLevelButton />
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      {/* TODO: Font Size */}
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />

      {sections[1].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}

      <TextColorButton />
      <HighlightColorButton />
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      {/* TODO: Link */}
      {/* TODO: Image */}
      {/* TODO: Align */}
      {/* TODO: Line height */}
      {/* TODO: List */}

      {sections[2].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
    </div>
  );
};

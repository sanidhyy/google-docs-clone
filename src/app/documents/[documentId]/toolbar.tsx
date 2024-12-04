'use client';

import {
  BoldIcon,
  ChevronDownIcon,
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

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { useEditorStore } from '@/store/use-editor-store';

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
      {/* TODO: Heading */}
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      {/* TODO: Font Size */}
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />

      {sections[1].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}

      {/* TODO: Text color */}
      {/* TODO: Highlight color */}
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

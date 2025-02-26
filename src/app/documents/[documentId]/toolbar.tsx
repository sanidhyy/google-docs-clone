'use client';

import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BoldIcon,
  ChevronDownIcon,
  HighlighterIcon,
  ImageIcon,
  ItalicIcon,
  Link2Icon,
  ListCollapseIcon,
  ListIcon,
  ListOrderedIcon,
  ListTodoIcon,
  type LucideIcon,
  MessageSquarePlusIcon,
  MinusIcon,
  PlusIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  SearchIcon,
  SpellCheckIcon,
  UnderlineIcon,
  Undo2Icon,
  UploadIcon,
} from 'lucide-react';
import { useState } from 'react';
import { type ColorResult, TwitterPicker } from 'react-color';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { useEditorStore } from '@/store/use-editor-store';

const LineHeightButton = () => {
  const { editor } = useEditorStore();

  const lineHeights = [
    { label: 'Default', value: 'normal' },
    { label: 'Single', value: '1' },
    { label: '1.15', value: '1.15' },
    { label: '1.5', value: '1.5' },
    { label: 'Double', value: '2' },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex h-7 min-w-7 shrink-0 items-center justify-center overflow-hidden rounded-sm px-1.5 text-sm hover:bg-neutral-200">
          <ListCollapseIcon className="size-4" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="flex flex-col gap-y-1 p-1">
        {lineHeights.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => editor?.commands.setLineHeight(value)}
            className={cn(
              'flex items-center gap-x-2 rounded-sm px-2 py-1 hover:bg-neutral-200/80',
              editor?.getAttributes('paragraph').lineHeight === value && 'bg-neutral-200/80',
            )}
          >
            <span className="text-sm">{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const FontSizeButton = () => {
  const { editor } = useEditorStore();

  const currentSize = editor?.getAttributes('textStyle').fontSize;
  const currentFontSize = currentSize ? currentSize.replace('px', '') : '16';

  const [fontSize, setFontSize] = useState<string>(currentFontSize);
  const [inputValue, setInputValue] = useState(fontSize);
  const [isEditing, setIsEditing] = useState(false);

  const updateFontSize = (newSize: string) => {
    const size = parseInt(newSize);

    if (!Number.isNaN(size) && size > 0) {
      editor?.commands.setFontSize(`${size}px`);
      setFontSize(newSize);
      setInputValue(newSize);
      setIsEditing(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
    updateFontSize(inputValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      updateFontSize(inputValue);
      editor?.commands.focus();
    }
  };

  const increment = () => {
    const newSize = parseInt(fontSize) + 1;
    updateFontSize(newSize.toString());
  };

  const decrement = () => {
    const newSize = parseInt(fontSize) - 1;
    if (newSize > 0) updateFontSize(newSize.toString());
  };

  return (
    <div className="flex items-center gap-x-0.5">
      <button onClick={decrement} className="flex size-7 shrink-0 items-center justify-center rounded-sm hover:bg-neutral-200">
        <MinusIcon className="size-4" />
      </button>

      {isEditing ? (
        <input
          autoFocus
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
          className="h-7 w-10 rounded-sm border border-neutral-400 bg-transparent text-center text-sm focus:outline-none focus:ring-0"
        />
      ) : (
        <button
          onClick={() => {
            setIsEditing(true);
            setFontSize(currentFontSize);
          }}
          className="h-7 w-10 cursor-text rounded-sm border border-neutral-400 bg-transparent text-center text-sm"
        >
          {currentFontSize}
        </button>
      )}

      <button onClick={increment} className="flex size-7 shrink-0 items-center justify-center rounded-sm hover:bg-neutral-200">
        <PlusIcon className="size-4" />
      </button>
    </div>
  );
};

const ListButton = () => {
  const { editor } = useEditorStore();

  const lists = [
    {
      label: 'Bullet List',
      icon: ListIcon,
      isActive: () => editor?.isActive('bulletList'),
      onClick: () => editor?.commands.toggleBulletList(),
    },
    {
      label: 'Ordered List',
      icon: ListOrderedIcon,
      isActive: () => editor?.isActive('orderedList'),
      onClick: () => editor?.commands.toggleOrderedList(),
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex h-7 min-w-7 shrink-0 items-center justify-center overflow-hidden rounded-sm px-1.5 text-sm hover:bg-neutral-200">
          <ListIcon className="size-4" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="flex flex-col gap-y-1 p-1">
        {lists.map(({ label, icon: Icon, onClick, isActive }) => (
          <button
            key={label}
            onClick={onClick}
            className={cn('flex items-center gap-x-2 rounded-sm px-2 py-1 hover:bg-neutral-200/80', isActive() && 'bg-neutral-200/80')}
          >
            <Icon className="size-4" />
            <span className="text-sm">{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const AlignButton = () => {
  const { editor } = useEditorStore();

  const alignments = [
    {
      label: 'Align Left',
      value: 'left',
      icon: AlignLeftIcon,
    },
    {
      label: 'Align Center',
      value: 'center',
      icon: AlignCenterIcon,
    },
    {
      label: 'Align Right',
      value: 'right',
      icon: AlignRightIcon,
    },
    {
      label: 'Align Justify',
      value: 'justify',
      icon: AlignJustifyIcon,
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex h-7 min-w-7 shrink-0 items-center justify-center overflow-hidden rounded-sm px-1.5 text-sm hover:bg-neutral-200">
          <AlignCenterIcon className="size-4" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="flex flex-col gap-y-1 p-1">
        {alignments.map(({ label, value, icon: Icon }) => (
          <button
            key={value}
            onClick={() => editor?.commands.setTextAlign(value)}
            className={cn(
              'flex items-center gap-x-2 rounded-sm px-2 py-1 hover:bg-neutral-200/80',
              editor?.isActive({ textAlign: value }) && 'bg-neutral-200/80',
            )}
          >
            <Icon className="size-4" />
            <span className="text-sm">{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const ImageButton = () => {
  const { editor } = useEditorStore();
  const [imageUrl, setImageUrl] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const onChange = (src: string, alt?: string) => {
    if (!src.trim()) return;
    editor?.commands.setImage({ src, alt });
  };

  const onUpload = () => {
    const input = document.createElement('input');

    input.type = 'file';
    input.accept = 'image/*';

    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];

      if (file) {
        const imageUrl = URL.createObjectURL(file);
        onChange(imageUrl, 'Uploaded Image');
      }
    };

    input.click();
  };

  const handleImageUrlSubmit = () => {
    if (imageUrl) {
      onChange(imageUrl, 'URL Image');
      setImageUrl('');
      setIsDialogOpen(false);
    }
  };

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <button className="flex h-7 min-w-7 shrink-0 items-center justify-center overflow-hidden rounded-sm px-1.5 text-sm hover:bg-neutral-200">
            <ImageIcon className="size-4" />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuItem onClick={onUpload}>
            <UploadIcon className="mr-2 size-4" />
            Upload
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => setIsDialogOpen(true)}>
            <SearchIcon className="mr-2 size-4" />
            Paste image url
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Insert image URL</DialogTitle>
          </DialogHeader>

          <Input
            placeholder="Insert image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleImageUrlSubmit();
            }}
          />

          <DialogFooter>
            <Button onClick={handleImageUrlSubmit}>Insert</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

const LinkButton = () => {
  const { editor } = useEditorStore();
  const [value, setValue] = useState('');
  const [open, setOpen] = useState(false);

  const onChange = (href: string) => {
    if (!href.trim()) return;
    editor?.chain().focus().extendMarkRange('link').setLink({ href }).run();
    setValue('');
    setOpen(false);
  };

  return (
    <DropdownMenu
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
        if (open) setValue(editor?.getAttributes('link').href || '');
      }}
    >
      <DropdownMenuTrigger asChild>
        <button className="flex h-7 min-w-7 shrink-0 items-center justify-center overflow-hidden rounded-sm px-1.5 text-sm hover:bg-neutral-200">
          <Link2Icon className="size-4" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="p-2.5">
        <form
          onSubmit={(e) => {
            e.preventDefault();

            onChange(value);
          }}
          className="flex items-center gap-x-2"
        >
          <Input type="url" placeholder="https://example.com" value={value} onChange={(e) => setValue(e.target.value)} required />
          <Button type="submit" disabled={!value.trim()}>
            Apply
          </Button>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const HighlightColorButton = () => {
  const { editor } = useEditorStore();

  const value = editor?.getAttributes('highlight').color as string;

  const onChange = (color: ColorResult) => {
    editor?.commands.setHighlight({ color: color as unknown as string });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex h-7 min-w-7 shrink-0 items-center justify-center overflow-hidden rounded-sm px-1.5 text-sm hover:bg-neutral-200">
          <HighlighterIcon className="size-4" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="p-0">
        {/* @ts-expect-error Server Component */}
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
        <button className="flex h-7 min-w-7 shrink-0 flex-col items-center justify-center overflow-hidden rounded-sm px-1.5 text-sm hover:bg-neutral-200">
          <span className="text-xs">A</span>

          <div className="h-0.5 w-full" style={{ backgroundColor: value }} />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="p-0">
        {/* @ts-expect-error Server Component */}
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
        <button className="flex h-7 min-w-7 shrink-0 items-center justify-center overflow-hidden rounded-sm px-1.5 text-sm hover:bg-neutral-200">
          <span className="truncate">{getCurrentHeading()}</span>

          <ChevronDownIcon className="ml-2 size-4 shrink-0" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="flex flex-col gap-y-1 p-1">
        {headings.map(({ label, value, fontSize }) => (
          <DropdownMenuItem key={value} asChild>
            <button
              onClick={() => {
                if (value === 0) editor?.commands.setParagraph();
                else editor?.commands.toggleHeading({ level: value });
              }}
              className={cn(
                'flex items-center gap-x-2 rounded-sm px-2 py-1 hover:bg-neutral-200/80',
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
        <button className="flex h-7 w-[120px] shrink-0 items-center justify-between overflow-hidden rounded-sm px-1.5 text-sm hover:bg-neutral-200">
          <span className="truncate">{editor?.getAttributes('textStyle').fontFamily || 'Arial'}</span>

          <ChevronDownIcon className="ml-2 size-4 shrink-0" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="flex flex-col gap-y-1 p-1">
        {fonts.map(({ label, value }) => (
          <DropdownMenuItem key={value} asChild>
            <button
              onClick={() => editor?.commands.setFontFamily(value)}
              className={cn(
                'flex items-center gap-x-2 rounded-sm px-2 py-1 hover:bg-neutral-200/80',
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
        'flex h-7 min-w-7 items-center justify-center rounded-sm text-sm hover:bg-neutral-200/80 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
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
        onClick: () => editor?.commands.addPendingComment(),
        isActive: editor?.isActive('liveblocksCommentMark'),
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
    <div className="flex min-h-[40px] items-center gap-x-0.5 overflow-x-auto rounded-[24px] bg-[#f1f4f9] px-2.5 py-0.5">
      {sections[0].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}

      <Separator orientation="vertical" className="h-6 bg-neutral-300" />

      <FontFamilyButton />
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      <HeadingLevelButton />
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      <FontSizeButton />
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />

      {sections[1].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}

      <TextColorButton />
      <HighlightColorButton />
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      <LinkButton />
      <ImageButton />
      <AlignButton />
      <LineHeightButton />
      <ListButton />

      {sections[2].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
    </div>
  );
};

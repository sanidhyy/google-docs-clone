import { Editor } from './editor';
import { Navbar } from './navbar';
import { Room } from './room';
import { Toolbar } from './toolbar';

interface DocumentIdPageProps {
  params: Promise<{ documentId: string }>;
}

const DocumentIdPage = async ({ params }: DocumentIdPageProps) => {
  const { documentId } = await params;

  return (
    <div className="min-h-screen bg-[#fafbfd]">
      <div className="flex flex-col px-4 pt-2 gap-y-2 fixed top-0 inset-x-0 z-10 bg-[#FAFBFD] print:hidden">
        <Navbar />
        <Toolbar />
      </div>

      <div className="pt-[114px] print:pt-0">
        <Room roomId={documentId}>
          <Editor />
        </Room>
      </div>
    </div>
  );
};
export default DocumentIdPage;

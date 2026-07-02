import { Form } from '@/components/admin/Form';
import { Editor } from '@/components/admin/Editor';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function AdminArticleEditPage({ params }: Props) {
  const { id } = await params;
  return (
    <section className="space-y-5">
      <h1 className="text-[32px] font-semibold tracking-[-0.02em] text-[#062A4F]">Edit article</h1>
      <Form title={`Article ID: ${id}`}>
        <Editor />
      </Form>
    </section>
  );
}

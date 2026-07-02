import { Form } from '@/components/admin/Form';
import { Editor } from '@/components/admin/Editor';

export default function AdminArticleNewPage() {
  return (
    <section className="space-y-5">
      <h1 className="text-[32px] font-semibold tracking-[-0.02em] text-[#062A4F]">New article</h1>
      <Form title="Article draft">
        <Editor />
      </Form>
    </section>
  );
}

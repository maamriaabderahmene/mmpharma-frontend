import { Form } from '@/components/admin/Form';
import { Editor } from '@/components/admin/Editor';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function AdminProductEditPage({ params }: Props) {
  const { id } = await params;

  return (
    <section className="space-y-5">
      <h1 className="text-[32px] font-semibold tracking-[-0.02em] text-[#062A4F]">Edit product</h1>
      <Form title={`Product ID: ${id}`}>
        <p className="text-sm text-[#3F4A57]">
          Edit shell is ready. Connect this screen to product fetch/update endpoints and validation schemas.
        </p>
        <Editor />
      </Form>
    </section>
  );
}

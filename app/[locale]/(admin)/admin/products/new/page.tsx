import { Form } from '@/components/admin/Form';
import { ImageUploader } from '@/components/admin/ImageUploader';

export default function AdminProductNewPage() {
  return (
    <section className="space-y-5">
      <h1 className="text-[32px] font-semibold tracking-[-0.02em] text-[#062A4F]">New product</h1>
      <Form title="Product draft">
        <p className="text-sm text-[#3F4A57]">
          Product creation form shell is ready. Hook this screen to RHF + Zod and the products create API.
        </p>
        <ImageUploader />
      </Form>
    </section>
  );
}

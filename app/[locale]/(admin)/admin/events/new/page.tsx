import { Form } from '@/components/admin/Form';

export default function AdminEventNewPage() {
  return (
    <section className="space-y-5">
      <h1 className="text-[32px] font-semibold tracking-[-0.02em] text-[#062A4F]">New event</h1>
      <Form title="Event details">
        <p className="text-sm text-[#3F4A57]">Configure date, location, capacity and registration settings.</p>
      </Form>
    </section>
  );
}

import Tabs from "@/components/Tabs";

export default function MyBook({ children }: { children: React.ReactNode }) {
  return (
    <div className="container-style">
      <Tabs />
      {children}
    </div>
  );
}

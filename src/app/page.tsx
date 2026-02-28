import AssetList from "@/src/components/AssetList";

export default function Home() {
  return (
    <main className="space-y-20">
      <section className="h-screen flex flex-col justify-center items-center">
        <h1 className="text-5xl font-bold">Nguyễn Tâm Bảo</h1>
        <p className="text-gray-500 mt-4">
          Pixel Artist & Developer
        </p>
      </section>

      <section id="assets" className="container mx-auto">
        <h2 className="text-3xl font-bold mb-6">
          Free Assets
        </h2>
        <AssetList />
      </section>

      <section id="contact" className="h-60 bg-gray-100 flex items-center justify-center">
        <p>Email: your@email.com</p>
      </section>
    </main>
  );
}
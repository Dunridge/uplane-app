export default function Header() {
  return (
    <header
      className="w-full flex items-center text-white py-6 px-6"
      style={{
        background:
          "linear-gradient(rgb(36, 118, 255) 0%, rgb(14, 84, 201) 100%)",
      }}
    >
      <div className="text-lg font-bold">Uplane</div>
    </header>
  );
}

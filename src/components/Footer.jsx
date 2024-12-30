import MediaLinks from "../components/MediaLinks";

export default function Footer() {
  return (
    <section className="">
      <div className="w-full mx-auto px-10">
        <div className="flex w-full  justify-between mx-5 my-5 items-center">
          <h1 className="text-center text-xls text-cyan-300 font-semibold mb-5">
            Pantho Haque
          </h1>
          <MediaLinks />
        </div>
        <p className="text-center text-slate-300 text-sm mb-5">
          copyright@<b>Pantho Haque</b>
        </p>
      </div>
    </section>
  );
}

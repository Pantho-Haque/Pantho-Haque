
import MediaLinks from "../components/MediaLinks";

export default function Footer() {
  return (
    <section className="py-40 ">
      <div className="max-w-lg mx-auto px-10">
        <h1 className="text-center text-5xl text-cyan-300 font-semibold mb-5">
          Pantho Haque
        </h1>

        {/* quote */}
        <div className="flex flex-col justify-end items-end text-justify">
          <p>
            &quot;And so do all who live to see such times. But that is not for
            them to decide. All we have to decide is what to do with the time
            that is given us.&quot;
          </p>
          <p>- Gandalf (Lord of the Rings)</p>
        </div>

        {/* link */}
        <MediaLinks />
        <p className="text-center mt-20">
          copyright@<b>Pantho Haque</b>
        </p>
      </div>
    </section>
  );
}

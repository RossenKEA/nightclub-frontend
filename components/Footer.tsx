export default function Footer() {
  return (
    <footer className="relative bg-[url('/images/footer-bg.png')] bg-cover bg-center text-white">
      <div className="absolute inset-0" />

      <div className="relative mx-auto grid max-w-7xl gap-16 px-8 py-24 lg:grid-cols-3">
        <section>
          <div className="mb-16">
            <h2 className="text-4xl font-black uppercase tracking-[0.15em]">
              Night<span className="text-pink-500">Club</span>
            </h2>
            <p className="mt-3 text-xs uppercase tracking-[0.65em] text-white/80">
              Have a good time
            </p>
          </div>

          <div className="space-y-10">
            <div>
              <h3 className="mb-4 text-2xl font-bold uppercase tracking-wider text-pink-500">
                Location
              </h3>
              <p className="font-bold">Kompagnistræde 278</p>
              <p className="font-bold">1265 København K</p>
            </div>

            <div>
              <h3 className="mb-4 text-2xl font-bold uppercase tracking-wider text-pink-500">
                Opening Hours
              </h3>
              <p className="font-bold uppercase">Wed - Thu 10:30 PM to 3 AM</p>
              <p className="font-bold uppercase">Sat - Sun: 11 PM to 5 AM</p>
            </div>
          </div>
        </section>

        <section>
          <h3 className="mb-14 text-2xl font-bold uppercase tracking-wider text-pink-500">
            News
          </h3>

          <div className="space-y-12">
            <FooterNewsItem image="/images/footer-news-1.png" />
            <FooterNewsItem image="/images/footer-news-2.png" />
          </div>
        </section>

        <section>
          <h3 className="mb-14 text-2xl font-bold uppercase tracking-wider text-pink-500">
            Recent Posts
          </h3>

          <div className="space-y-14">
            <RecentPost />
            <RecentPost />
          </div>
        </section>
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-8 pb-10 text-white/60 md:flex-row">
        <p className="font-bold">Night Club - All Rights Reserved</p>

        <div className="text-center">
          <p className="mb-4 font-bold text-white">Stay Connected With Us</p>

          <div className="flex justify-center gap-6">
            <SocialIcon label="f" />
            <SocialIcon label="♟" />
            <SocialIcon label="◎" />
          </div>
        </div>

        <p className="font-bold">Copyright © NightClub</p>
      </div>
    </footer>
  );
}

function FooterNewsItem({ image }: { image: string }) {
  return (
    <article className="flex gap-8">
      <img
        src={image}
        alt=""
        className="h-28 w-28 object-cover"
      />

      <div>
        <p className="max-w-xs text-lg font-medium leading-8">
          Lorem Ipsum is simply dummy text of the printing and typesetting.
        </p>
        <p className="mt-4 font-bold text-pink-500">April 17, 2026</p>
      </div>
    </article>
  );
}

function RecentPost() {
  return (
    <article className="flex gap-8">
      <span className="text-4xl leading-none text-pink-500">x</span>

      <div>
        <p className="max-w-sm text-lg font-medium leading-8">
          It is a long established fact that a reader will be distracted by the
          readable...
        </p>
        <p className="mt-4 font-bold text-pink-500">5 hours ago</p>
      </div>
    </article>
  );
}

function SocialIcon({ label }: { label: string }) {
  return (
    <a
      href="#"
      className="flex h-12 w-12 items-center justify-center border-2 border-white text-2xl font-bold text-white hover:border-pink-500 hover:text-pink-500"
    >
      {label}
    </a>
  );
}
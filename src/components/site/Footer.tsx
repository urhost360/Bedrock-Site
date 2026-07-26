import { Link } from "@tanstack/react-router";
import { SITE } from "@/lib/site";
import { OrderLink } from "@/components/site/OrderLink";
import { Facebook, Instagram, MapPin, Phone } from "lucide-react";

function YelpIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="m7.689 15.142-3.672.848c-.377.087-.755.183-1.145.155-.261-.019-.512-.042-.76-.213a1.2 1.2 0 0 1-.332-.36c-.348-.551-.365-1.366-.37-2a6.3 6.3 0 0 1 .332-2.064a2 2 0 0 1 .107-.248a2 2 0 0 1 .126-.216a3 3 0 0 1 .156-.198a1.2 1.2 0 0 1 .399-.283a1.1 1.1 0 0 1 .46-.083c.235.001.513.052.91.173.055.02.123.038.185.057.328.101.705.24 1.15.399q1.027.36 2.046.74l1.212.442q.333.12.64.297c.175.098.328.23.452.387a1.2 1.2 0 0 1 .192.43a1.22 1.22 0 0 1-.872 1.453q-.072.022-.108.03l-1.105.255zM18.82 7.565a2 2 0 0 0-.204-.175a2 2 0 0 0-.208-.14a2 2 0 0 0-.227-.109a1.2 1.2 0 0 0-.482-.08a1.1 1.1 0 0 0-.45.127c-.21.105-.439.273-.742.555-.042.042-.095.089-.142.133-.25.235-.528.525-.86.863a115 115 0 0 0-1.516 1.563l-.897.93a4 4 0 0 0-.446.548a1.5 1.5 0 0 0-.237.545a1.2 1.2 0 0 0 .011.452l.005.02a1.22 1.22 0 0 0 1.418.923a1 1 0 0 0 .11-.021l4.779-1.104c.376-.087.758-.167 1.097-.363c.227-.132.443-.262.59-.525a1.2 1.2 0 0 0 .141-.469c.073-.65-.267-1.39-.54-1.963a6.3 6.3 0 0 0-1.2-1.71M8.97.075a9 9 0 0 0-.83.157q-.415.097-.815.223c-.868.285-2.089.807-2.295 1.807c-.117.565.16 1.144.373 1.66c.26.625.614 1.189.938 1.778c.854 1.554 1.724 3.099 2.592 4.645c.259.462.542 1.047 1.043 1.286a1 1 0 0 0 .101.038c.225.085.47.102.704.047l.042-.01a1.2 1.2 0 0 0 .566-.34a1 1 0 0 0 .079-.081c.346-.435.345-1.084.376-1.614c.104-1.77.214-3.542.301-5.314c.033-.671.106-1.333.066-2.01c-.033-.557-.037-1.198-.39-1.656c-.621-.807-1.947-.74-2.852-.616m2.083 15.95a1.105 1.105 0 0 0-1.23-.414a1 1 0 0 0-.153.064a1.5 1.5 0 0 0-.217.135c-.2.148-.367.34-.52.532-.038.049-.074.114-.12.156l-.768 1.057a114 114 0 0 0-1.291 1.79c-.278.389-.519.718-.709 1.009-.036.054-.073.116-.107.164-.228.352-.357.61-.423.838a1.1 1.1 0 0 0-.046.472c.021.166.077.325.163.467q.069.108.15.207a2 2 0 0 0 .174.183a2 2 0 0 0 .211.173c.53.37 1.111.634 1.722.84a6 6 0 0 0 1.572.3q.136.006.273-.006a2 2 0 0 0 .25-.035a2 2 0 0 0 .245-.071a1.2 1.2 0 0 0 .418-.266c.112-.113.199-.25.254-.4c.089-.22.147-.502.185-.92c.004-.059.012-.13.018-.195c.03-.346.044-.753.067-1.231q.056-1.103.09-2.203l.05-1.306c.01-.3.001-.634-.082-.934a1.4 1.4 0 0 0-.176-.405m8.676 2.045c-.16-.176-.388-.352-.746-.568l-.169-.101c-.298-.18-.658-.369-1.078-.597a121 121 0 0 0-1.943-1.042l-1.151-.61c-.06-.018-.12-.061-.177-.088a3 3 0 0 0-.699-.25a1.5 1.5 0 0 0-.254-.027a1 1 0 0 0-.165.01a1.11 1.11 0 0 0-.923.914a1.4 1.4 0 0 0 .016.439c.056.306.193.61.335.875l.615 1.152q.512.975 1.043 1.94c.23.421.42.78.598 1.079c.034.056.072.116.101.168c.218.358.392.584.57.746a1.1 1.1 0 0 0 .894.301a2 2 0 0 0 .25-.043q.124-.033.242-.078a2 2 0 0 0 .247-.115a6 6 0 0 0 1.282-.96a6.7 6.7 0 0 0 1.182-1.51q.066-.12.114-.248a3 3 0 0 0 .077-.24a3 3 0 0 0 .043-.252a1.2 1.2 0 0 0-.056-.491a1.1 1.1 0 0 0-.248-.404m2.86 3.742a.85.85 0 0 1-.111.423a.85.85 0 0 1-.312.318a.84.84 0 0 1-.438.119a.85.85 0 0 1-.438-.118a.85.85 0 0 1-.312-.317a.86.86 0 0 1-.111-.425q0-.23.114-.43a.84.84 0 0 1 .315-.316a.85.85 0 0 1 .432-.115a.85.85 0 0 1 .43.114a.84.84 0 0 1 .315.315a.85.85 0 0 1 .116.432m-.12 0q0-.2-.1-.37a.6.6 0 0 0-.27-.27a.7.7 0 0 0-.371-.1a.7.7 0 0 0-.37.099a.75.75 0 0 0-.271.27a.7.7 0 0 0-.1.37q0 .199.1.372a.74.74 0 0 0 .27.271a.74.74 0 0 0 .37.099a.7.7 0 0 0 .37-.1a.74.74 0 0 0 .27-.27a.7.7 0 0 0 .102-.371m-.577.058.272.452h-.192l-.237-.405h-.155v.405h-.17v-1.02h.3q.19 0 .278.075.09.075.089.227a.3.3 0 0 1-.05.162a.3.3 0 0 1-.135.104m-.042-.14a.15.15 0 0 0 .056-.122q0-.086-.049-.122-.05-.039-.156-.038h-.12v.328h.123q.091 0 .146-.047z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="bg-bark text-cream/85">
      <div className="mx-auto max-w-7xl px-6 py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <img
            src={SITE.logoUrl}
            alt="Pecan St. Station Deli & Grill"
            className="h-20 sm:h-24 w-auto bg-transparent"
            width={480}
            height={294}
            decoding="async"
          />
          <p className="mt-6 max-w-md text-cream/70 leading-relaxed">
            Serving Pflugerville great food and warm Southern hospitality since 2000. Come as a stranger, leave as family.
          </p>
          <div className="mt-6 flex gap-3">
            <a href={SITE.socials.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="grid h-10 w-10 place-items-center rounded-full border border-cream/20 hover:border-primary hover:text-primary transition-colors"><Facebook size={16} /></a>
            <a href={SITE.socials.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="grid h-10 w-10 place-items-center rounded-full border border-cream/20 hover:border-primary hover:text-primary transition-colors"><Instagram size={16} /></a>
            <a href={SITE.socials.yelp} target="_blank" rel="noreferrer" aria-label="Yelp" className="grid h-10 w-10 place-items-center rounded-full border border-cream/20 hover:border-primary hover:text-primary transition-colors"><YelpIcon /></a>
          </div>
        </div>

        <div>
          <h4 className="font-display text-lg tracking-widest text-primary">VISIT</h4>
          <a href={SITE.mapsUrl} target="_blank" rel="noreferrer" className="mt-4 flex items-start gap-2 text-sm hover:text-cream">
            <MapPin size={16} className="mt-0.5 shrink-0" /> {SITE.address}
          </a>
          <a href={SITE.phoneHref} className="mt-3 flex items-center gap-2 text-sm hover:text-cream">
            <Phone size={16} /> {SITE.phone}
          </a>
        </div>

        <div>
          <h4 className="font-display text-lg tracking-widest text-primary">EXPLORE</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/menu" className="hover:text-cream">Menu</Link></li>
            <li><Link to="/photos" className="hover:text-cream">Photos</Link></li>
            <li><Link to="/about" className="hover:text-cream">Our Story</Link></li>
            <li><Link to="/visit" className="hover:text-cream">Hours & Location</Link></li>
            <li><OrderLink className="hover:text-cream">Order Online</OrderLink></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-6 text-xs text-cream/50 flex flex-wrap items-center justify-between gap-3">
          <span>© {new Date().getFullYear()} Pecan St. Station Deli & Grill. All rights reserved.</span>
          <a
            href="https://urhost360.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-cream transition-colors"
          >
            Designed by urhost360
          </a>
          <span>1005 W Pecan St · Pflugerville, Texas</span>
        </div>
      </div>
    </footer>
  );
}

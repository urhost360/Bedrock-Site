import heroDining from "@/assets/hero-dining.jpg";
import storefront from "@/assets/storefront.jpg";
import patio from "@/assets/patio.jpg";
import storyFacade from "@/assets/story-facade.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery18 from "@/assets/gallery-18.jpg";
import gallery19 from "@/assets/gallery-19.jpg";
import gallery20 from "@/assets/gallery-20.jpg";
import gallery21 from "@/assets/gallery-21.jpg";
import gallery22 from "@/assets/gallery-22.jpg";
import gallery23 from "@/assets/gallery-23.jpg";
import gallery24 from "@/assets/gallery-24.jpg";
import guestFrenchToast from "@/assets/guest-french-toast.jpg";
import guestTaterTots from "@/assets/guest-tater-tots.jpg";
import guestMushroomBaconBurger from "@/assets/guest-mushroom-bacon-burger.jpg";
import guestGrilledSandwich from "@/assets/guest-grilled-sandwich.jpg";
import guestSaladBar from "@/assets/guest-salad-bar.jpg";
import guestMenuBoards from "@/assets/guest-menu-boards.jpg";
import guestDiningRoom from "@/assets/guest-dining-room.jpg";
import guestOmelet from "@/assets/guest-omelet.jpg";
import guestMigasPlate from "@/assets/guest-migas-plate.jpg";
import guestBreakfastTaco from "@/assets/guest-breakfast-taco.jpg";
import guestServiceCounter from "@/assets/guest-service-counter.jpg";
import guestCondimentBar from "@/assets/guest-condiment-bar.jpg";
import guestBakedPotato from "@/assets/guest-baked-potato.jpg";
import guestMonumentSign from "@/assets/guest-monument-sign.jpg";
import guestPancakes from "@/assets/guest-pancakes.jpg";

export type Photo = {
  src: string;
  alt: string;
  id: string;
  width: number;
  height: number;
};

/** Professional photos from pecanstreetstation.com. */
const OFFICIAL_PHOTOS: Photo[] = [
  { id: "hero-dining", src: heroDining, alt: "Dining room at Pecan St. Station Deli & Grill", width: 3840, height: 1920 },
  { id: "storefront", src: storefront, alt: "Drive-thru at Pecan St. Station Deli & Grill", width: 3840, height: 1920 },
  { id: "patio", src: patio, alt: "Outdoor patio at Pecan St. Station Deli & Grill", width: 3840, height: 1920 },
  { id: "story-facade", src: storyFacade, alt: "Front of Pecan St. Station Deli & Grill on Pecan Street", width: 1684, height: 934 },
  { id: "gallery-4", src: gallery4, alt: "Soup sampler at Pecan St. Station Deli & Grill", width: 2560, height: 1709 },
  { id: "gallery-18", src: gallery18, alt: "Fresh baked cookies and muffins at Pecan St. Station", width: 2560, height: 1709 },
  { id: "gallery-19", src: gallery19, alt: "Breakfast plate at Pecan St. Station Deli & Grill", width: 2560, height: 1709 },
  { id: "gallery-20", src: gallery20, alt: "Migas breakfast at Pecan St. Station Deli & Grill", width: 2560, height: 1709 },
  { id: "gallery-21", src: gallery21, alt: "Chicken tender basket at Pecan St. Station Deli & Grill", width: 2560, height: 1709 },
  { id: "gallery-22", src: gallery22, alt: "Inside Pecan St. Station Deli & Grill dining room", width: 2560, height: 1709 },
  { id: "gallery-23", src: gallery23, alt: "Burger and onion rings at Pecan St. Station Deli & Grill", width: 2560, height: 1709 },
  { id: "gallery-24", src: gallery24, alt: "Grill favorites at Pecan St. Station Deli & Grill", width: 2560, height: 1709 },
];

/** Customer / community shots from real visits — audited for this location only. */
const GUEST_PHOTOS: Photo[] = [
  { id: "guest-mushroom-bacon-burger", src: guestMushroomBaconBurger, alt: "Open-faced mushroom bacon burger at Pecan St. Station", width: 1170, height: 880 },
  { id: "guest-grilled-sandwich", src: guestGrilledSandwich, alt: "Grilled sandwich and soup at Pecan St. Station Deli & Grill", width: 1440, height: 768 },
  { id: "guest-salad-bar", src: guestSaladBar, alt: "Salad bar and Best of Pflugerville award at Pecan St. Station", width: 1173, height: 880 },
  { id: "guest-monument-sign", src: guestMonumentSign, alt: "Drive-thru monument sign for Pecan St. Station Deli & Grill", width: 1173, height: 880 },
  { id: "guest-omelet", src: guestOmelet, alt: "Bacon and sausage omelet with cheddar at Pecan St. Station", width: 1173, height: 880 },
  { id: "guest-pancakes", src: guestPancakes, alt: "Stack of pancakes with butter and syrup at Pecan St. Station", width: 1173, height: 880 },
  { id: "guest-menu-boards", src: guestMenuBoards, alt: "Digital menu boards above the counter at Pecan St. Station", width: 1173, height: 880 },
  { id: "guest-service-counter", src: guestServiceCounter, alt: "Service counter and soda fountain at Pecan St. Station", width: 1173, height: 880 },
  { id: "guest-condiment-bar", src: guestCondimentBar, alt: "Self-serve condiment bar at Pecan St. Station Deli & Grill", width: 1173, height: 880 },
  { id: "guest-dining-room", src: guestDiningRoom, alt: "Dining room seating at Pecan St. Station Deli & Grill", width: 660, height: 880 },
  { id: "guest-migas-plate", src: guestMigasPlate, alt: "Breakfast plate with eggs, salsa, beans, and hash browns", width: 660, height: 880 },
  { id: "guest-breakfast-taco", src: guestBreakfastTaco, alt: "Breakfast taco with hash browns at Pecan St. Station", width: 660, height: 880 },
  { id: "guest-french-toast", src: guestFrenchToast, alt: "French toast dusted with powdered sugar at Pecan St. Station", width: 660, height: 880 },
  { id: "guest-baked-potato", src: guestBakedPotato, alt: "Loaded baked potato with broccoli and cheese", width: 660, height: 880 },
  { id: "guest-tater-tots", src: guestTaterTots, alt: "Crispy tater tots at Pecan St. Station Deli & Grill", width: 660, height: 880 },
];

const ALL_PHOTOS: Photo[] = [...OFFICIAL_PHOTOS, ...GUEST_PHOTOS];

function findPhoto(id: string) {
  const photo = ALL_PHOTOS.find((p) => p.id === id);
  if (!photo) throw new Error(`Missing photo: ${id}`);
  return photo;
}

export const GALLERY_PHOTOS: Photo[] = ALL_PHOTOS;

/** Hand-picked highlights for homepage, menu, and about sections. */
export const FEATURED_PHOTOS = {
  hero: findPhoto("hero-dining"),
  interior: findPhoto("gallery-22"),
  diningRoom: findPhoto("guest-dining-room"),
  counter: findPhoto("guest-service-counter"),
  storefront: findPhoto("storefront"),
  monument: findPhoto("guest-monument-sign"),
  patio: findPhoto("patio"),
  facade: findPhoto("story-facade"),
  saladBar: findPhoto("guest-salad-bar"),
  burger: findPhoto("gallery-23"),
  sandwich: findPhoto("guest-grilled-sandwich"),
  soup: findPhoto("gallery-4"),
  bakery: findPhoto("gallery-18"),
  breakfast: findPhoto("guest-pancakes"),
  lunch: findPhoto("gallery-23"),
  chicken: findPhoto("gallery-21"),
  strip: [
    findPhoto("hero-dining"),
    findPhoto("gallery-20"),
    findPhoto("gallery-18"),
  ],
};

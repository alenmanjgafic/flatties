import { MotionConfig } from "framer-motion";
import NavbarV4 from "@/components/v4/NavbarV4";
import ContactV4 from "@/components/v4/ContactV4";
import FooterV4 from "@/components/v4/FooterV4";

export default function KontaktPage() {
  return (
    <MotionConfig reducedMotion="user">
      <main className="bg-flame min-h-screen">
        <NavbarV4 />
        <ContactV4 />
        <FooterV4 />
      </main>
    </MotionConfig>
  );
}

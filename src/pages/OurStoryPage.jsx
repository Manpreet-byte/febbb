import { motion } from 'framer-motion';
import Timeline from '../components/Timeline';
import LoveStats from '../components/LoveStats';
import ReasonsCarousel from '../components/ReasonsCarousel';
import RoyalDivider from '../components/RoyalDivider';
import PageHeader from '../components/PageHeader';

export default function OurStoryPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <PageHeader
        title="Our Story"
        subtitle="Every moment with you is a chapter I never want to end"
      />

      <Timeline />
      <RoyalDivider />
      <LoveStats />
      <RoyalDivider />
      <ReasonsCarousel />
    </motion.div>
  );
}

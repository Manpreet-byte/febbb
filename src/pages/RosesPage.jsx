import { motion } from 'framer-motion';
import RoseGallery from '../components/RoseGallery';
import PageHeader from '../components/PageHeader';

export default function RosesPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <PageHeader title="Roses for You" subtitle="If I could, I would fill your world with flowers" />
      <RoseGallery />
    </motion.div>
  );
}

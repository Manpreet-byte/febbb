import { motion } from 'framer-motion';
import ScratchCards from '../components/ScratchCards';
import MemoryGame from '../components/MemoryGame';
import LoveQuiz from '../components/LoveQuiz';
import SpinWheel from '../components/SpinWheel';
import RoyalDivider from '../components/RoyalDivider';
import PageHeader from '../components/PageHeader';

export default function PlayPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <PageHeader
        title="Games & Fun"
        subtitle="A little play, a lot of love"
      />

      <ScratchCards />
      <RoyalDivider />
      <MemoryGame />
      <RoyalDivider />
      <LoveQuiz />
      <RoyalDivider />
      <SpinWheel />
    </motion.div>
  );
}

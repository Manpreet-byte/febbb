import { motion } from 'framer-motion';
import FortuneCookies from '../components/FortuneCookies';
import LoveLetter from '../components/LoveLetter';
import BucketList from '../components/BucketList';
import RoyalDivider from '../components/RoyalDivider';
import PageHeader from '../components/PageHeader';

export default function LettersPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <PageHeader
        title="Words & Dreams"
        subtitle="Whispers from the heart, wishes for our forever"
      />

      <FortuneCookies />
      <RoyalDivider />
      <LoveLetter />
      <RoyalDivider />
      <BucketList />
    </motion.div>
  );
}

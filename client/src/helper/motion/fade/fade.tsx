import { motion } from "framer-motion";

export default function Fade({children}: any) {
    return (
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        >
        {children}
        </motion.div>
    )
}
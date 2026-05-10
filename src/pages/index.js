export function getServerSideProps() {
  return { redirect: { destination: '/engagement', permanent: false } };
}

export default function Home() {
  return null;
}

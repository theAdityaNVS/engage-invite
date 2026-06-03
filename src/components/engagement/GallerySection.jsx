import ScrollReveal from '@/components/shared/ScrollReveal';
import PhotoCarousel from '@/components/shared/PhotoCarousel';
import MandalaPattern from '@/components/shared/MandalaPattern';
import SectionHeader from '@/components/shared/SectionHeader';
import { useLanguage } from '@/hooks/useLanguage';

export default function GallerySection() {
  const { t } = useLanguage();

  return (
    <section style={{
      background: 'var(--rose)',
      padding: 'clamp(3rem, 8vw, 5rem) 0',
      overflow: 'hidden',
      position: 'relative',
    }}>
      <MandalaPattern color="var(--gold-light)" opacity={0.16} />
      <div style={{ position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
        <ScrollReveal>
          <SectionHeader
            eyebrow={t('memories_label')}
            title={t('gallery_heading')}
            subtitle={t('gallery_subheading')}
            eyebrowType="serif"
            theme="burgundy"
            style={{ marginBottom: '2.5rem' }}
          />
        </ScrollReveal>
      </div>

      <div style={{ padding: '0 1rem' }}>
        <PhotoCarousel photos={[]} />
      </div>
      </div>
    </section>
  );
}

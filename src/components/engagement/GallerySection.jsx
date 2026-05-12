import ScrollReveal from '@/components/shared/ScrollReveal';
import PhotoCarousel from '@/components/shared/PhotoCarousel';
import { useLanguage } from '@/hooks/useLanguage';

export default function GallerySection() {
  const { t } = useLanguage();

  return (
    <section style={{
      background: 'var(--rose)',
      padding: 'clamp(3rem, 8vw, 5rem) 0',
      overflow: 'hidden',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
        <ScrollReveal>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <p style={{
              fontFamily: "'Lora', serif",
              fontSize: '0.8rem',
              color: 'rgba(255,248,240,0.55)',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              marginBottom: '0.5rem',
            }}>
              ✦ {t('memories_label')} ✦
            </p>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(1.8rem, 5vw, 2.8rem)',
              color: 'var(--burgundy-text)',
              marginBottom: '0.5rem',
            }}>
              {t('gallery_heading')}
            </h2>
            <p style={{
              fontFamily: "'Lora', serif",
              fontStyle: 'italic',
              color: 'var(--burgundy-text)',
              opacity: 0.7,
              fontSize: '0.95rem',
            }}>
              {t('gallery_subheading')}
            </p>
          </div>
        </ScrollReveal>
      </div>

      <div style={{ padding: '0 1rem' }}>
        <PhotoCarousel />
      </div>
    </section>
  );
}

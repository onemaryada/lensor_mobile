import type {DocumentSection} from '@/components/DocumentScreen';

export const PRIVACY_SECTIONS: DocumentSection[] = [
  {
    title: 'Overview',
    body: 'Lensor is a fully offline photo editor. We believe your photos are yours alone — the app has no account system, no analytics trackers, and no advertising SDKs.',
  },
  {
    title: 'Data We Collect',
    body: 'None. Lensor does not collect, transmit, or store any personal information on external servers. All image processing happens entirely on your device.',
  },
  {
    title: 'Photos & Media Access',
    body: 'Lensor requests access to your photo library only so you can choose an image to edit and save the results back to your gallery. Images never leave your device.',
  },
  {
    title: 'Storage',
    body: 'Edited images are saved to the Pictures/Lensor album on your device. A small local preference (whether onboarding has been completed) is stored on-device and never shared.',
  },
  {
    title: 'Third-Party Services',
    body: 'Lensor does not integrate any third-party analytics, advertising, or tracking services. Open-source libraries used by the app run locally and do not phone home.',
  },
  {
    title: 'Children’s Privacy',
    body: 'Lensor is suitable for all ages. Because no data is collected from any user, no data is collected from children.',
  },
  {
    title: 'Changes to This Policy',
    body: 'If this policy changes in a future release, the updated version will ship with the app and be summarized in the release notes.',
  },
  {
    title: 'Contact',
    body: 'Questions about privacy? Reach out at keyushrashiya2002@gmail.com and we will get back to you promptly.',
  },
];

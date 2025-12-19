export interface DefaultChant {
    id: string;
    text: string;
    description: string;
    voiceName: string;
    lang: string;
}

export const defaultChants: DefaultChant[] = [
    {
        id: 'radha-radha',
        text: 'राधा राधा',
        description: 'Deep, calm male voice.',
        voiceName: 'hi-IN-Wavenet-D',
        lang: 'hi-IN',
    },
    {
        id: 'om-namah-shivaye',
        text: 'ॐ नमः शिवाय',
        description: 'Deep male voice.',
        voiceName: 'hi-IN-Wavenet-B',
        lang: 'hi-IN',
    },
    {
        id: 'hare-krishna',
        text: 'हरे कृष्णा',
        description: 'Gentle, calm male voice.',
        voiceName: 'hi-IN-Wavenet-D',
        lang: 'hi-IN',
    },
    {
        id: 'jai-shri-ram',
        text: 'जय श्री राम',
        description: 'Powerful male voice.',
        voiceName: 'hi-IN-Wavenet-B',
        lang: 'hi-IN',
    },
    {
        id: 'waheguru',
        text: 'वाहेगुरु',
        description: 'Clear, resonant male voice.',
        voiceName: 'hi-IN-Wavenet-D',
        lang: 'hi-IN',
    },
];

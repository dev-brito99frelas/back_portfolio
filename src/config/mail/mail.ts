interface IMailConfig {
    drive: 'ethereal' | 'ses';
    deafults: {
        from: {
            email: string;
            name: string;
        };
    };
}
export default {
    drive: process.env.MAIL_DRIVER || 'ethereal',
    deafults: {
        from: {
            email: 'clodoaldo.brtp4@gmail.com',
            name: 'clodoaldo neto',
        },
    },
} as IMailConfig;

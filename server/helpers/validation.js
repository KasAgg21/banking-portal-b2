exports.otpMailValidator=[
    check('email','Please include a valid email').isEmail().normalizeEMail({
        gmail_removedots:true
    }),
];

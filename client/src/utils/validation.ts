export const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
        return 'Email should be in the format "example@example.com"';
    }
    return '';
};

export const validatePassword = (password: string) => {
    if (!password.match(/[A-Z]/)) {
        return 'Password must contain at least one uppercase letter';
    }

    if (!password.match(/[0-9]/)) {
        return 'Password must contain at least one number';
    }

    if (password.length < 8) {
        return 'Password must be at least 8 characters long';
    }

    return '';
};

export const validateName = (name: string) => {
    const nameRegex = /^[\u0590-\u05FFa-zA-Z\s&]{3,15}$/;

    if (!nameRegex.test(name)) {
        return 'Name should be between 3 and 15 characters long';
    }
    return '';
};

export const validatePhoneNumber = (phoneNumber: string) => {
    const phoneRegex = /^(?:[0-9] ?-?){6,14}[0-9]$/;

    if (!phoneRegex.test(phoneNumber)) {
        return 'Phone number should be in the format "1234567890"';
    }
    return '';
};

export const validateFields = (packageId: string, date: string, beginingHour: string, endHour: string) => {
    if (!packageId || !date || !beginingHour || !endHour) {
        return 'Please fill in all fields.';
    }
    return '';
};

export const validateDate = (date: string) => {
    if (new Date(date) < new Date()) {
        return 'Date must be in the future.';
    }
    return '';
};

export const validateHours = (beginningHour: string, endHour: string) => {
    const beginningTime = new Date(`01/01/2000 ${beginningHour}`);
    const endTime = new Date(`01/01/2000 ${endHour}`);

    const timeDiffInMinutes = (endTime.getTime() - beginningTime.getTime()) / 60000;

    if (timeDiffInMinutes < 30) {
        return 'The end hour must be at least half an hour greater than the beginning hour.';
    }

    return '';
};

export const validateAddress = (address: string) => {
    const addressRegex = /^[a-zA-Z0-9\s,'-]{5,30}$/;

    if (!addressRegex.test(address)) {
        return 'Address should be between 5 and 30 characters long and contain only letters, numbers, spaces, commas, apostrophes, and hyphens.';
    }
    return '';
};

export const validatePrice = (price: number) => {
    if (price < 1) {
        return 'The price must be positive';
    }
    return '';
};

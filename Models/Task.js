const mongoose = require("../Database/Config");


const iconUrls = [
    'https://img.icons8.com/?size=100&id=25717&format=png&color=000000',
    'https://img.icons8.com/?size=100&id=40390&format=png&color=000000',
    'https://img.icons8.com/?size=100&id=jiAKUZAnt9go&format=png&color=000000',
    'https://img.icons8.com/?size=100&id=1613&format=png&color=000000'
];

const getRandomIconUrl = () => {
    return iconUrls[Math.floor(Math.random() * iconUrls.length)];
};


const taskSchema = new mongoose.Schema({
	title: {
        type: String,
        required: true,
        trim: true,
    },
    iconUrl: {
        type: String,
        default: getRandomIconUrl,
        required: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    status: {
        type: String,
        enum: ['in-progress', 'completed'],
        default: 'in-progress',
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    deadline: {
        type: Date,
        required: true,
    },

    type: {
        type: String,
        enum: ['emergency', 'normal'],
        default: 'normal',
        required: true,
    }
});

taskSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});


taskSchema.post('save', function () {
    console.log('Task saved');
});



const Task = mongoose.model('task', taskSchema);

module.exports = Task;

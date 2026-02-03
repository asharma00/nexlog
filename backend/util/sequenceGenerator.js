import counterModel from '../models/counterModel.js'

const getNextSequence = async(name) => {
    const counter = await counterModel.findByIdAndUpdate (
        { _id: name },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
    );
    return counter.seq;
}

const generateUsername = async() => {
    const sequence = await getNextSequence('userSequence');
    const uniqueNumber = 1000 + sequence; 
    return `nexlogUser${uniqueNumber}`;
}

export default generateUsername;
const Booking = require('../models/Booking')

module.exports = {
  async store(req, res) {
    const { user_id: user } = req.headers
    const { spot_id: spot } = req.params
    const { date } = req.body

    const booking =
      await Booking.create({
        user,
        spot,
        date
      })

    await booking
      .populate('spot')
      .populate('user')
      .execPopulate()

    const ownerSocket = req.connectedUsers[booking.spot.user]

    if (ownerSocket) {
        req.io
          .to(ownerSocket)
          .emit('booking-request', booking)
    }

    return res.json(booking)
  }
}

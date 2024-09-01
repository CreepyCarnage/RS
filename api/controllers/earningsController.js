import Reservation from "../models/Reservation.js";

export const getEarnings = async (req, res, next) => {
  const { range } = req.query;
  let startDate, endDate;
  const today = new Date();

  switch (range) {
    case 'week':
      startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
      endDate = today;
      break;
    case 'month':
      startDate = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
      endDate = today;
      break;
    case 'year':
      startDate = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
      endDate = today;
      break;
    default:
      startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 30);
      endDate = today;
  }

  try {
    const earnings = await Reservation.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate, $lte: endDate },
          status: 'confirmed'
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          earnings: { $sum: "$totalAmount" }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    const total = earnings.reduce((sum, item) => sum + item.earnings, 0);

    res.json({
      earnings: earnings.map(item => ({ date: item._id, earnings: item.earnings })),
      total
    });
  } catch (err) {
    next(err);
  }
};
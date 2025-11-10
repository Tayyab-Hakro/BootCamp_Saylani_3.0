import PaymentModel from "../schemes/PaymentsSchema.js";

export const addpayments = async (req, res) => {
  try {
    const { description, amount, balance } = req.body;

    if (!description || !amount || !balance) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    if (!["income", "expense"].includes(balance)) {
      return res.status(400).json({
        success: false,
        message: "Balance must be 'income' or 'expense'",
      });
    }
    const numericAmount = Number(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Amount must be a positive number",
      });
    }

    const allPayments = await PaymentModel.find();
    let totalIncome = 0;
    let totalExpense = 0;

    allPayments.forEach((p) => {
      const amt = Number(p.amount);
      if (p.balance === "income") totalIncome += amt;
      if (p.balance === "expense") totalExpense += amt;
    });

    const totalBalance = totalIncome - totalExpense;

    if (balance === "expense" && numericAmount > totalBalance) {
      return res.status(400).json({
        success: false,
        message: "Not enough balance for this expense",
      });
    }

    const newPayment = await PaymentModel.create({
      description,
      amount: numericAmount,
      balance,
    });

    return res.status(201).json({
      success: true,
      message: "Payment Created Successfully",
      payment: newPayment,
    });
  } catch (error) {
    console.error("Add Payment Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getDashboard = async (req, res) => {
  try {
    const payments = await PaymentModel.find()

    let totalIncome = 0;
    let totalExpense = 0;

    payments.forEach((p) => {
      const amt = Number(p.amount);
      if (isNaN(amt) || amt <= 0) return;
      if (p.balance === "income") totalIncome += amt;
      if (p.balance === "expense") totalExpense += amt;
    });

    const totalBalance = totalIncome - totalExpense;

    return res.status(200).json({
      success: true,
      payments,
      totalIncome,
      totalExpense,
      totalBalance,
    });
  } catch (error) {
    console.error("Get Dashboard Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

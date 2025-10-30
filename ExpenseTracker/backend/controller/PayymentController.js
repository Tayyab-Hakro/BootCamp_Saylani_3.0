import PaymentModel from "../schemes/PaymentsSchema.js"



 export const addpayments = async(req , res)=>{

try {
  const { description, amount, balance } = req.body;

  if (!description || !amount || !balance) {
    return res.status(400).json({ success: false, message: "Please fill all fields" });
  }

  if (!["income", "expense"].includes(balance)) {
    return res.status(400).json({ success: false, message: "Balance must be 'income' or 'expense'" });
  }

  const addPayment = await PaymentModel.create({
    description,
    amount,
    balance,
    Date:Date.now
  });

  return res.status(201).json({
    success: true,
    message: "Payment Created Successfully",
    payment: addPayment
  });

} catch (error) {
  console.error(error);
  return res.status(500).json({ success: false, message: "Server Error" });
}

}
  export const getDashboard = async (req, res) => {
  try {
    const {id} = req.params
    const payments = await PaymentModel.find();

    let totalIncome = 0;
    let totalExpense = 0;

    payments.forEach(p => {
      const amt = Number(p.amount); // ensure it's a number
      if (p.balance === "income") totalIncome += amt;
      if (p.balance === "expense") totalExpense += amt;
    });

    const totalBalance = totalIncome - totalExpense;

    return res.json({
      success: true,
      payments,
      totalIncome,
      totalExpense,
      totalBalance,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

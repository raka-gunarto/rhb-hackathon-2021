
export default function calculateCreditScore(reportVars) {
  let score = 1000;

  score -= reportVars.inquiries.length * 10;
  let totalPayments = Math.max(
    1,
    reportVars.accounts.reduce((acc, c) => acc + c.payments.length, 0)
  );
  let onTimePayments = Math.max(
    1,
    reportVars.accounts.reduce(
      (acc, c) =>
        acc + c.payments.reduce((acc, c) => (acc + c === 0 ? 1 : 0), 0),
      0
    )
  );
  return score * (onTimePayments / totalPayments);
}


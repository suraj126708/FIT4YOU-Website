import express from "express";
import db from "../database/db.js";
import ensureAuthenticated from "../middlewares/Auth.js";

const router = express.Router();

router.get("/", ensureAuthenticated, (req, res) => {
  const query = `
    SELECT MIN(id) AS id, name, email, message
    FROM contact_us
    WHERE answered = false
    GROUP BY message, name, email ;
  `;

  db.query(query, (error, results) => {
    if (error) {
      console.error("Error executing query:", error);
      return res
        .status(500)
        .json({ success: false, message: "Database query failed" });
    }

    res.status(200).json({
      success: true,
      data: results,
    });
  });
});

router.get("/questionAnswer", (req, res) => {
  const query = `
  SELECT 
    cu.message AS question,
    fa.answer AS answer
FROM 
    contact_us cu
INNER JOIN 
    faq_answers fa
ON 
    cu.id = fa.contact_us_id
WHERE 
    fa.answer IS NOT NULL
ORDER BY 
    fa.updated_at ASC 
LIMIT 5;
  `;

  db.query(query, (error, results) => {
    if (error) {
      console.error("Error executing query:", error);
      return res
        .status(500)
        .json({ success: false, message: "Database query failed" });
    }

    res.status(200).json({
      success: true,
      data: results,
    });
  });
});

router.post("/answer", (req, res) => {
  const { questionId, answer } = req.body;

  if (
    !Number.isInteger(questionId) ||
    typeof answer !== "string" ||
    !answer.trim()
  ) {
    return res.status(400).json({ success: false, message: "Invalid input" });
  }

  const checkQuery = `
    SELECT COUNT(*) AS count
    FROM contact_us
    WHERE email = ? AND message = ? AND answered = false;
  `;

  db.query(
    checkQuery,
    [req.body.email, req.body.message],
    (checkErr, checkResults) => {
      if (checkErr) {
        console.error("Error executing check query:", checkErr);
        return res
          .status(500)
          .json({ success: false, message: "Database query failed" });
      }

      if (checkResults[0].count > 0) {
        return res.status(409).json({
          success: false,
          message:
            "This question has already been submitted and is awaiting an answer.",
        });
      }

      const queryInsertAnswer =
        "INSERT INTO faq_answers (contact_us_id, answer) VALUES (?, ?)";
      const queryUpdateAnswered =
        "UPDATE contact_us SET answered = true WHERE id = ?"; // Mark as answered

      db.query(queryInsertAnswer, [questionId, answer], (err, results) => {
        if (err) {
          console.error("Failed to submit answer:", err);
          return res
            .status(500)
            .json({ success: false, message: "Error submitting answer" });
        }

        db.query(
          queryUpdateAnswered,
          [questionId],
          (updateErr, updateResults) => {
            if (updateErr) {
              console.error("Failed to mark question as answered:", updateErr);
              return res
                .status(500)
                .json({ success: false, message: "Error updating question" });
            }

            res.json({
              success: true,
              message:
                "Answer submitted successfully and question marked as answered",
              id: results.insertId,
            });
          }
        );
      });
    }
  );
});

export default router;

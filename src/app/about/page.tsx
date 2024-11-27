import React from "react";
import { Box, Typography, Grid } from "@mui/material";

const AboutPage = () => {
    return (
        <Box sx={{ backgroundColor: "#F9F2D7", paddingBottom: "50px" }} dir="rtl">
            {/* Header Section */}
            {/* החלק העליון עם התמונה ושכבת overlay */}
            <Box sx={{ marginBottom: 50 }}>
                <Box
                    sx={{
                        position: "relative",
                        height: "300px",
                        backgroundImage: "url('data:image/jpeg;base64,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')", // כאן תוסיף URL לתמונה שלך
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    <Box
                        sx={{
                            height: "250px",
                            textAlign: "center",
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: "rgba(1, 1, 1, 0.2)", // צבע שקוף
                        }}

                    >
                        <Typography
                            variant="h3"
                            sx={{
                                fontWeight: "bold",
                                fontFamily: "'Assistant', sans-serif",
                                color: "white",
                            }}
                        >
                            אודות
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                maxWidth: "700px",
                                margin: "0 auto",
                                lineHeight: "1.8",
                                fontSize: "20px",
                                fontFamily: "'Assistant', sans-serif",
                                color: "white",
                                padding: "20px",
                                borderRadius: "10px",
                            }}
                        >
                            ברוכים הבאים למקום שבו לימוד פוגש השראה. האתר שלנו מציע חוויית לימוד ייחודית ומותאמת אישית לציבור החרדי, עם ספרים נבחרים, כלים מתקדמים, וקבוצות לימוד המחברות בין לומדים. כאן תוכלו לצמוח, להעמיק ולהתקדם בדרך שלכם, עם תמיכה מתמדת ותחושת שייכות אמיתית.
                        </Typography>
                    </Box>
                </Box>

                <Box sx={{ textAlign: "center", marginTop: "40px", marginBottom: "40px" }}>
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: "bold",
                            fontFamily: "'Assistant', sans-serif",
                            color: "black",
                        }}
                    >
                        לומדים חכמה, צומחים יחד
                    </Typography>
                    <Box
                        sx={{
                            width: "200px",
                            height: "4px",
                            justifyContent: "flex-end",
                            backgroundColor: "#F3DD86",
                            margin: "10px auto",
                        }}
                    ></Box>
                </Box>

                <Grid container spacing={6} sx={{ maxWidth: "1200px", margin: "auto" }}>
                    <Grid item xs={12}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
                            <Box
                                sx={{
                                    width: "150px",
                                    height: "150px",
                                    backgroundColor: "#F3DD86",
                                    borderRadius: "50%",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    flexShrink: 0,
                                }}
                            >
                                <Box
                                    sx={{
                                        width: "130px",
                                        height: "130px",
                                        backgroundImage: "url('/feature1-image.jpg')",
                                        backgroundSize: "cover",
                                        borderRadius: "50%",
                                    }}
                                ></Box>
                            </Box>
                            <Box>
                                <Typography dir="rtl"
                                    variant="h5"
                                    sx={{
                                        fontWeight: "bold",
                                        marginBottom: "10px",
                                        fontFamily: "'Assistant', sans-serif",
                                    }}
                                >
                                    פתרונות מהירים, הצלחה גדולה
                                </Typography>
                                <Box
                                    sx={{
                                        width: "200px",
                                        height: "4px",
                                        backgroundColor: "#F3DD86",
                                        marginBottom: "15px",
                                    }}
                                ></Box>
                                <Typography dir="rtl"
                                    variant="body1"
                                    sx={{
                                        color: "#000",
                                        lineHeight: "1.8",
                                        fontFamily: "'Assistant', sans-serif",
                                    }}
                                >
                                    באתר שלנו, כל הכלים זמינים לך בלחיצת כפתור: סימניות חכמות,
                                    <br />
                                    שאלות למעקב עצמי, וקבוצות למידה שמשלבות אותך בקהילה תומכת של לומדים.
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>

                    {/* Feature 2 */}
                    <Grid item xs={12}>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: "20px",
                                flexDirection: { xs: "column-reverse", md: "row-reverse" },
                            }}
                        >
                            <Box
                                sx={{
                                    width: "150px",
                                    height: "150px",
                                    backgroundColor: "#F3DD86",
                                    borderRadius: "50%",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    flexShrink: 0,
                                }}
                            >
                                <Box
                                    sx={{
                                        width: "130px",
                                        height: "130px",
                                        backgroundImage: "url('/feature2-image.jpg')",
                                        backgroundSize: "cover",
                                        borderRadius: "50%",
                                    }}
                                ></Box>
                            </Box>
                            <Box>
                                <Typography dir="rtl"
                                    variant="h5"
                                    sx={{
                                        fontWeight: "bold",
                                        marginBottom: "10px",
                                        fontFamily: "'Assistant', sans-serif",
                                    }}
                                >
                                    המקום המושלם ללמוד
                                </Typography>
                                <Box dir="rtl"
                                    sx={{
                                        width: "180px",
                                        height: "4px",
                                        backgroundColor: "#F3DD86",
                                        marginBottom: "15px",
                                    }}
                                ></Box>
                                <Typography dir="rtl"
                                    variant="body1"
                                    sx={{
                                        color: "#000",
                                        lineHeight: "1.8",
                                        fontFamily: "'Assistant', sans-serif",
                                    }}
                                >
                                    האתר שלנו עוצב במיוחד עבור הציבור החרדי, עם דגש על עיצוב נקי ופשוט
                                    <br />
                                    שמאפשר להתמקד בתוכן. כל פרט תוכנן כדי להעניק חוויית לימוד נוחה,
                                    <br />
                                    איכותית, ויעילה, תוך התאמה מלאה לערכים ולצרכים המיוחדים של הקהילה.
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>

                {/* Additional Features */}
                <Grid container spacing={6} sx={{ maxWidth: "1200px", margin: "auto", marginTop: "40px" }}>
                    {/* Feature 3 */}
                    <Grid item xs={12}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
                            <Box
                                sx={{
                                    width: "150px",
                                    height: "150px",
                                    backgroundColor: "#F3DD86",
                                    borderRadius: "50%",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    flexShrink: 0,
                                }}
                            >
                                <Box
                                    sx={{
                                        width: "130px",
                                        height: "130px",
                                        backgroundImage: "url('/feature3-image.jpg')",
                                        backgroundSize: "cover",
                                        borderRadius: "50%",
                                    }}
                                ></Box>
                            </Box>
                            <Box>
                                <Typography dir="rtl"
                                    variant="h5"
                                    sx={{
                                        fontWeight: "bold",
                                        marginBottom: "10px",
                                        fontFamily: "'Assistant', sans-serif",
                                    }}
                                >
                                    ידע מחבר בין אנשים
                                </Typography>
                                <Box
                                    sx={{
                                        width: "160px",
                                        height: "4px",
                                        backgroundColor: "#F3DD86",
                                        marginBottom: "15px",
                                    }}
                                ></Box>
                                <Typography dir="rtl"
                                    variant="body1"
                                    sx={{
                                        color: "#000",
                                        lineHeight: "1.8",
                                        fontFamily: "'Assistant', sans-serif",
                                    }}
                                >
                                    הלמידה כאן אינה לבד: קבוצות הצ'אט שלנו מחברות בין לומדים מכל מקום,
                                    <br />
                                    לתמיכה, שיתוף ידע, ושאלות שמביאות לתשובות חדשות.
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: "20px",
                                flexDirection: { xs: "column-reverse", md: "row-reverse" },
                            }}
                        >
                            <Box
                                sx={{
                                    width: "150px",
                                    height: "150px",
                                    backgroundColor: "#F3DD86",
                                    borderRadius: "50%",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    flexShrink: 0,
                                }}
                            >
                                <Box
                                    sx={{
                                        width: "130px",
                                        height: "130px",
                                        backgroundImage: "url('/feature2-image.jpg')",
                                        backgroundSize: "cover",
                                        borderRadius: "50%",
                                    }}
                                ></Box>
                            </Box>
                            <Box>
                                <Typography dir="rtl"
                                    variant="h5"
                                    sx={{
                                        fontWeight: "bold",
                                        marginBottom: "10px",
                                        fontFamily: "'Assistant', sans-serif",
                                    }}
                                >
                                    התהליך שלך, ההתקדמות שלך
                                </Typography>
                                <Box dir="rtl"
                                    sx={{
                                        width: "180px",
                                        height: "4px",
                                        backgroundColor: "#F3DD86",
                                        marginBottom: "15px",
                                    }}
                                ></Box>
                                <Typography dir="rtl"
                                    variant="body1"
                                    sx={{
                                        color: "#000",
                                        lineHeight: "1.8",
                                        fontFamily: "'Assistant', sans-serif",
                                    }}
                                >
                                    עם גרפים שמראים לך בדיוק איפה את.ה עומד.ת,
                                    <br />
                                    ושיטות למידה מותאמות אישית, תוכל.י להרגיש את הצמיחה שלך כל יום מחדש.
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>

                {/* Bottom Section */}
            </Box>

            <Box sx={{ textAlign: "center" ,marginBottom:5}}>
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: "bold",
                        fontFamily: "'Assistant', sans-serif",
                        marginBottom: "20px",
                        textAlign: "center",
                    }}
                >

                    למה דווקא אצלנו?
                </Typography>
                <Grid container spacing={4} sx={{ maxWidth: "1200px", margin: "auto" }}>
                    {/* Card 1 */}
                    <Grid item xs={12} md={4}>
                        <Box>
                            <Box
                                sx={{
                                    width: "70px",
                                    height: "70px",
                                    justifyContent: "center",
                                    style: { Widt: "1200px" },
                                    backgroundColor: "white",
                                    borderRadius: "50%",
                                }}
                            ></Box>
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: "bold",
                                    marginBottom: "10px",
                                    fontFamily: "'Assistant', sans-serif",
                                }}
                            >
                                התקדמות אישית
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{ fontFamily: "'Assistant', sans-serif" }}
                            >
                                תוכלו לראות את ההתקדמות שלכם ולראו לבד,
                                <br />
                                ששני דקות בכל יום יכולות ליצור שינוי אדיר!
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Box>
                            <Box
                                sx={{
                                    width: "70px",
                                    height: "70px",
                                    justifyContent: "center",
                                    style: { Widt: "1200px" },
                                    backgroundColor: "white",
                                    borderRadius: "50%",
                                }}
                            ></Box>
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: "bold",
                                    marginBottom: "10px",
                                    fontFamily: "'Assistant', sans-serif",
                                }}
                            >
                                קל להגיע
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{ fontFamily: "'Assistant', sans-serif" }}
                            >
                                הרבה אנשים חולמים לעבוד מהבית, שלא לדבר על כל הסטודנטים שחולמים ללמוד מהבית,
                                <br />
                                אבל לא תמיד זה מוכיח את עצמו. כאן מקדישים פשוט 2 דקות:
                                <br />
                                בהפסקת קפה, אחרי שהילדים נרדמו, ורואים התקדמות אדירה.
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Box>
                            <Box
                                sx={{
                                    width: "70px",
                                    height: "70px",
                                    justifyContent: "center",
                                    style: { Widt: "1200px" },
                                    backgroundColor: "white",
                                    borderRadius: "50%",
                                }}
                            ></Box>
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: "bold",
                                    marginBottom: "10px",
                                    fontFamily: "'Assistant', sans-serif",
                                }}
                            >
                                קידום אישי
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{ fontFamily: "'Assistant', sans-serif" }}
                            >
                                כיף להרגיש שמתקדמים בחיים, במיוחד בתחום הרוחני,
                                <br />
                                ואם יש לי איך לאכוף את זה ולראות את ההתקדמות בעיניים - עוד יותר טוב.
                                <br />
                                במיוחד שיש עוד כ”כ הרבה שותפים ביחד איתי...
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Box>

            <Box
                sx={{
                    width: "100%",
                    height: "6px",
                    backgroundColor: "#F3DD86",
                    marginBottom: "15px",
                }}
            ></Box>
        </Box>
    );
};

export default AboutPage;

export const getStudentProfile = async (sid, ayear) => {
  try {
    const res = await fetch(
      `https://lbsschool.in/old/lms/MobileAppBackend/getStudentProfile.php?sid=${sid}&ayear=${ayear}`
    );

    return await res.json();
  } catch (err) {
    console.error(err);
    return { status: false };
  }
};
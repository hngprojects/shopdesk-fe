

export async function deleteImage(
  productId: string,
  organizationId: string,
  filename: string
): Promise<string | null> {
  const apiUrl = "api/productImage";
  try {
    const response = await fetch(
      `${apiUrl}?filename=${filename}&product_id=${productId}&organization_id=${organizationId}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      throw new Error(`Failed to delete image: ${response.status}`);
    }
    const message = await response.json();
    return JSON.stringify({
      message: "File deleted successfully " + filename,
      response: message,
    });
  } catch (error) {
    console.error("Error deleting images:", error);
    return null;
  }
}

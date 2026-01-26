-- Add RESTRICTIVE policy to deny all UPDATE operations on leads table
CREATE POLICY "Deny all updates to leads"
ON public.leads
AS RESTRICTIVE
FOR UPDATE
USING (false);

-- Add RESTRICTIVE policy to deny all DELETE operations on leads table  
CREATE POLICY "Deny all deletes to leads"
ON public.leads
AS RESTRICTIVE
FOR DELETE
USING (false);
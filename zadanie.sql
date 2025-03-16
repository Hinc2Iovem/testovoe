WITH RecursiveSubdivisions AS (
    SELECT id, name, parent_id, 0 AS sub_level
    FROM subdivisions
    WHERE id = (SELECT subdivision_id FROM collaborators WHERE id = 710253)

    UNION ALL

    SELECT s.id, s.name, s.parent_id, rs.sub_level + 1
    FROM subdivisions s
    JOIN RecursiveSubdivisions rs ON s.parent_id = rs.id
)

SELECT 
    c.id AS id, 
    c.name AS name,
    s.name AS sub_name,
    c.subdivision_id AS sub_id,
    rs.sub_level AS sub_level,
    (SELECT COUNT(*) FROM collaborators WHERE subdivision_id = c.subdivision_id) AS colls_count
FROM collaborators c
JOIN RecursiveSubdivisions rs ON c.subdivision_id = rs.id
JOIN subdivisions s ON c.subdivision_id = s.id
WHERE c.age < 40 
AND c.subdivision_id NOT IN (100055, 100059)
ORDER BY rs.sub_level ASC;

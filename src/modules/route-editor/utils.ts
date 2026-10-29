import { lineString, point } from "@turf/helpers";
import { nearestPointOnLine } from "@turf/nearest-point-on-line";
import type { Coordinate, RoutePoint } from "@/shared/types";

export const findNearestSegment = (
  points: RoutePoint[],
  coordinate: Coordinate,
): number => {
  if (points.length < 2) return -1;

  const line = lineString(
    points.map((item) => item.coordinate),
  );

  const nearest = nearestPointOnLine(
    line,
    point(coordinate),
  );

  return nearest.properties.index ?? -1;
};
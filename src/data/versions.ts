export interface BookVersion {
  version: string;
  slug: string;
}

export const bookVersions: BookVersion[] = [
  { version: '0.1.0-rc.3', slug: '010-rc3' },
  { version: '0.1.0-rc.2', slug: '010-rc2' },
];

function compareIdentifiers(left: string, right: string): number {
  const leftNumber = /^\d+$/.test(left) ? Number(left) : undefined;
  const rightNumber = /^\d+$/.test(right) ? Number(right) : undefined;

  if (leftNumber !== undefined && rightNumber !== undefined) return leftNumber - rightNumber;
  if (leftNumber !== undefined) return -1;
  if (rightNumber !== undefined) return 1;
  return left.localeCompare(right);
}

export function compareSemver(left: BookVersion, right: BookVersion): number {
  const [leftCore, leftPrerelease] = left.version.split('-', 2);
  const [rightCore, rightPrerelease] = right.version.split('-', 2);
  const leftParts = leftCore.split('.').map(Number);
  const rightParts = rightCore.split('.').map(Number);

  for (let index = 0; index < 3; index += 1) {
    const difference = (leftParts[index] ?? 0) - (rightParts[index] ?? 0);
    if (difference !== 0) return difference;
  }

  if (leftPrerelease === undefined && rightPrerelease !== undefined) return 1;
  if (leftPrerelease !== undefined && rightPrerelease === undefined) return -1;
  if (leftPrerelease === undefined || rightPrerelease === undefined) return 0;

  const leftIdentifiers = leftPrerelease.split('.');
  const rightIdentifiers = rightPrerelease.split('.');
  const length = Math.max(leftIdentifiers.length, rightIdentifiers.length);

  for (let index = 0; index < length; index += 1) {
    if (leftIdentifiers[index] === undefined) return -1;
    if (rightIdentifiers[index] === undefined) return 1;
    const difference = compareIdentifiers(leftIdentifiers[index], rightIdentifiers[index]);
    if (difference !== 0) return difference;
  }

  return 0;
}

export const orderedBookVersions = [...bookVersions].sort((left, right) =>
  compareSemver(right, left),
);

export const defaultBookVersion =
  orderedBookVersions.find(({ version }) => !version.includes('-')) ?? orderedBookVersions[0];
